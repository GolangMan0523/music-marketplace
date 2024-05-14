<?php

namespace App\Http\Controllers;

use App\Http\Requests\CrupdateBackstageRequestRequest;
use App\Models\BackstageRequest;
use App\Notifications\BackstageRequestWasHandled;
use App\Services\Backstage\ApproveBackstageRequest;
use App\Services\Backstage\CrupdateBackstageRequest;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Common\Files\FileEntry;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BackstageRequestController extends BaseController
{
    public function __construct(
        protected BackstageRequest $backstageRequest,
        protected Request $request,
    ) {
    }

    public function index(): Response
    {
        $userId = $this->request->get('userId');
        $this->authorize('index', [BackstageRequest::class, $userId]);

        $builder = $this->backstageRequest
            ->with(['user', 'artist'])
            ->orderByRaw("FIELD(status, 'pending', 'approved', 'denied') ASC");

        $paginator = new Datasource($builder, $this->request->all());

        $pagination = $paginator->paginate();

        return $this->success(['pagination' => $pagination]);
    }

    public function show(BackstageRequest $backstageRequest): Response
    {
        $this->authorize('show', $backstageRequest);

        $backstageRequest->load(['user.social_profiles', 'artist']);

        $request = $backstageRequest->toArray();

        if (isset($request['data']['passport_scan_id'])) {
            $request['data']['passport_scan_entry'] = FileEntry::find(
                $request['data']['passport_scan_id'],
            );
        }

        return $this->success(['request' => $request]);
    }

    public function store(CrupdateBackstageRequestRequest $request): Response
    {
        $this->authorize('store', BackstageRequest::class);

        $backstageRequest = app(CrupdateBackstageRequest::class)->execute(
            $request->all(),
        );

        return $this->success(['request' => $backstageRequest]);
    }

    public function update(
        BackstageRequest $backstageRequest,
        CrupdateBackstageRequestRequest $request,
    ): Response {
        $this->authorize('store', $backstageRequest);

        $backstageRequest = app(CrupdateBackstageRequest::class)->execute(
            $request->all(),
            $backstageRequest,
        );

        return $this->success(['request' => $backstageRequest]);
    }

    public function destroy(string $ids): Response
    {
        $backstageRequestIds = explode(',', $ids);
        $this->authorize('store', [
            BackstageRequest::class,
            $backstageRequestIds,
        ]);

        $this->backstageRequest->whereIn('id', $backstageRequestIds)->delete();

        return $this->success();
    }

    public function approve(BackstageRequest $backstageRequest): Response
    {
        $this->authorize('handle', BackstageRequest::class);

        $backstageRequest = App(ApproveBackstageRequest::class)->execute(
            $backstageRequest,
            $this->request->all(),
        );

        return $this->success(['request' => $backstageRequest]);
    }

    public function deny(BackstageRequest $backstageRequest): Response
    {
        $this->authorize('handle', BackstageRequest::class);

        $backstageRequest->fill(['status' => 'denied'])->save();

        $backstageRequest->user->notify(
            new BackstageRequestWasHandled(
                $backstageRequest,
                $actionParams['notes'] ?? null,
            ),
        );

        return $this->success(['request' => $backstageRequest]);
    }
}
