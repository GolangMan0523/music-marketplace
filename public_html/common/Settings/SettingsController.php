<?php namespace Common\Settings;

use Common\Core\AppUrl;
use Common\Core\BaseController;
use Common\Settings\Events\SettingsSaved;
use Common\Settings\Mail\ConnectGmailAccountController;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

class SettingsController extends BaseController
{
    public function __construct(
        protected Request $request,
        protected Settings $settings,
        protected DotEnvEditor $dotEnv,
    ) {
    }

    public function index()
    {
        $this->authorize('index', Setting::class);
        $envSettings = $this->dotEnv->load('.env');
        $envSettings['newAppUrl'] = app(AppUrl::class)->newAppUrl;
        $envSettings[
            'connectedGmailAccount'
        ] = ConnectGmailAccountController::getConnectedEmail();

        // inputs on frontend can't be bound to null
        foreach ($envSettings as $key => $value) {
            if ($value === null) {
                $envSettings[$key] = '';
            }
        }

        // Fetch the current maintenance mode status
        $maintenanceMode = $this->getMaintenanceMode();
        $envSettings['maintenance.enable'] = $maintenanceMode;

        return [
            'server' => $envSettings,
            'client' => $this->settings->getUnflattened(true),
        ];
    }

    public function persist()
    {
        $this->authorize('update', Setting::class);

        $clientSettings = $this->cleanValues($this->request->get('client'));
        $serverSettings = $this->cleanValues($this->request->get('server'));

        // Handle maintenance mode settings
        $maintenanceMode = $this->request->input('maintenance.enable', false);
        $this->updateMaintenanceMode($maintenanceMode);

        // need to handle files before validating
        $this->handleFiles();

        if (
            $errResponse = $this->validateSettings(
                $serverSettings,
                $clientSettings,
            )
        ) {
            return $errResponse;
        }

        if ($serverSettings) {
            $this->dotEnv->write($serverSettings);
        }

        if ($clientSettings) {
            $this->settings->save($clientSettings);
        }

        Cache::flush();

        event(new SettingsSaved($clientSettings, $serverSettings));

        return $this->success();
    }
    
    public function updateMaintenanceMode()
    {
    
        DB::table('settings')
            ->where('name', 'maintenance.enable')
            ->update(['value' => $this->request->input('maintenance.enable') ? 'true' : 'false']);
    
        return response()->json([
            'success' => true,
            'message' => 'Maintenance mode updated successfully.',
        ]);
    }
    
    private function getMaintenanceMode()
    {
        return DB::table('settings')
            ->where('name', 'maintenance.enable')
            ->value('value') === 'true';
    }

    private function cleanValues(string|null $config): array
    {
        if (!$config) {
            return [];
        }
        $config = json_decode($config, true);
        foreach ($config as $key => $value) {
            $config[$key] = is_string($value) ? trim($value) : $value;
        }
        return $config;
    }

    private function handleFiles()
    {
        $files = $this->request->allFiles();

        // store google analytics certificate file
        if ($certificateFile = Arr::get($files, 'certificate')) {
            File::put(
                storage_path('laravel-analytics/certificate.json'),
                file_get_contents($certificateFile),
            );
        }
    }

    private function validateSettings(
        array $serverSettings,
        array $clientSettings,
    ) {
        // flatten "client" and "server" arrays into single array
        $values = array_merge(
            $serverSettings ?: [],
            $clientSettings ?: [],
            $this->request->allFiles(),
        );
        $keys = array_keys($values);
        $validators = config('common.setting-validators');

        foreach ($validators as $validator) {
            if (empty(array_intersect($validator::KEYS, $keys))) {
                continue;
            }

            if ($messages = app($validator)->fails($values)) {
                return $this->error(
                    __('Could not persist settings.'),
                    $messages,
                );
            }
            // catch and display any generic error that might occur
        }
    }
}
