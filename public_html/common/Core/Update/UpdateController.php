<?php namespace Common\Core\Update;

use Common\Core\AppUrl;
use Common\Core\BaseController;
use Common\Settings\DotEnvEditor;
use Exception;

class UpdateController extends BaseController
{
    public function __construct(protected DotEnvEditor $dotEnvEditor)
    {
        if (
            !config('common.site.disable_update_auth') &&
            version_compare(
                config('common.site.version'),
                $this->getAppVersion(),
            ) === 0
        ) {
            $this->middleware('isAdmin');
        }
    }

    public function show()
    {
        $requirements = collect([
            'PDO' => [
                'result' => defined('PDO::ATTR_DRIVER_NAME'),
                'errorMessage' => 'PHP PDO extension is required.',
            ],
            'XML' => [
                'result' => extension_loaded('xml'),
                'errorMessage' => 'PHP XML extension is required.',
            ],
            'Mbstring' => [
                'result' => extension_loaded('mbstring'),
                'errorMessage' => 'PHP mbstring extension is required.',
            ],
            'Fileinfo' => [
                'result' => extension_loaded('fileinfo'),
                'errorMessage' => 'PHP fileinfo extension is required.',
            ],
            'OpenSSL' => [
                'result' => extension_loaded('openssl'),
                'errorMessage' => 'PHP openssl extension is required.',
            ],
            'GD' => [
                'result' => extension_loaded('gd'),
                'errorMessage' => 'PHP GD extension is required.',
            ],
            'fpassthru' => [
                'result' => function_exists('fpassthru'),
                'errorMessage' =>
                    '"fpassthru" PHP function needs to be enabled.',
            ],
            'Curl' => [
                'result' => extension_loaded('curl'),
                'errorMessage' => 'PHP curl functionality needs to be enabled.',
            ],
            'Zip' => [
                'result' => class_exists('ZipArchive'),
                'errorMessage' =>
                    'PHP ZipArchive extension needs to be installed.',
            ],
        ]);

        $directories = [
            '',
            'storage',
            'storage/app',
            'storage/logs',
            'storage/framework',
            'public',
        ];

        $baseDir = base_path();
        foreach ($directories as $directory) {
            $path = rtrim("$baseDir/$directory", '/');
            $writable = is_writable($path);
            if (!$writable) {
                $result = [
                    'path' => $path,
                    'result' => false,
                    'errorMessage' => '',
                ];
                $result['errorMessage'] = is_dir($path)
                    ? 'Make this directory writable by giving it 755 or 777 permissions via file manager.'
                    : 'Make this directory writable by giving it 644 permissions via file manager.';
                $requirements[] = $result;
            }
        }

        return view('common::update.update')->with([
            'htmlBaseUri' => app(AppUrl::class)->htmlBaseUri,
            'requirements' => $requirements,
            'requirementsFailed' => $requirements->some(function ($req) {
                return !$req['result'];
            }),
        ]);
    }

    public function update()
    {
        (new UpdateActions())->execute();

        return view('common::update.update-complete')->with([
            'htmlBaseUri' => app(AppUrl::class)->htmlBaseUri,
        ]);
    }

    private function getAppVersion(): string
    {
        try {
            return $this->dotEnvEditor->load('env.example')['app_version'];
        } catch (Exception $e) {
            return config('common.site.version');
        }
    }
}
