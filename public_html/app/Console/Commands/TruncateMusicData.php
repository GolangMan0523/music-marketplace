<?php

namespace App\Console\Commands;

use DB;
use Illuminate\Console\Command;
use Illuminate\Console\ConfirmableTrait;
use Schema;
use Storage;

class TruncateMusicData extends Command
{
    use ConfirmableTrait;

    protected $signature = 'music:truncate {--force : Force the operation to run when in production.}';

    protected $description = 'Truncate all music data on the site.';

    protected array $tablesToKeep = ['migrations', 'products', 'prices'];

    public function handle()
    {
        if (!$this->confirmToProceed()) {
            return;
        }

        $tableNames = Schema::getConnection()
            ->getDoctrineSchemaManager()
            ->listTableNames();

        foreach ($tableNames as $name) {
            if (!in_array($name, $this->tablesToKeep)) {
                DB::table($name)->truncate();
            }
        }

        Storage::deleteDirectory('waves');
    }
}
