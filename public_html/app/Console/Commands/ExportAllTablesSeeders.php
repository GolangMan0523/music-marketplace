<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ExportAllTablesSeeders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:export-all-tables-seeders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Export seeders for all tables and add them to DatabaseSeeder.php';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tables = DB::select('SHOW TABLES');

        foreach ($tables as $table) {
            $tableName = array_values((array) $table)[0];
            $this->exportSingleTableSeeder($tableName);
        }

        $this->updateDatabaseSeeder();
        $this->info("All table seeders have been exported and added to DatabaseSeeder.php.");
    }

    protected function exportSingleTableSeeder($table)
    {
        $rows = DB::table($table)->get();
        $tableName = Str::studly($table);
        $namespace = 'namespace Database\Seeders;';
        
        $seederContent = "<?php\n\n{$namespace}\n\nuse Illuminate\Database\Seeder;\nuse Illuminate\Support\Facades\DB;\n\nclass {$tableName}Seeder extends Seeder\n{\n    /**\n     * Auto generated seed file\n     *\n     * @return void\n     */\n    public function run()\n    {\n        DB::table('{$table}')->delete();\n";
        
        if ($rows->isEmpty()) {
            $seederContent .= "";
        } else {
            $seederContent .= "        DB::table('{$table}')->insert([\n";
            foreach ($rows as $key => $row) {
                $rowData = json_decode(json_encode($row), true);
                $seederContent .= "            " . str_repeat(' ', 0) . "{$key} => array(\n";
                foreach ($rowData as $field => $value) {
                    $seederContent .= "                " . str_repeat(' ', 0) . "'" . $field . "' => " . var_export($value, true) . ",\n";
                }
                $seederContent .= "            " . str_repeat(' ', 0) . "),\n";
            }
            $seederContent .= "        ]);\n";
        }
        
        $seederContent .= "    }\n}";
    
        $fileName = "{$tableName}Seeder.php";
        $path = database_path("seeders/{$fileName}");
        file_put_contents($path, $seederContent);
        $this->info("Seeder for table '{$table}' has been exported to {$path}.");
    }

    protected function updateDatabaseSeeder()
    {
        $databaseSeederPath = database_path('seeders/DatabaseSeeder.php');
        $databaseSeederContent = file_get_contents($databaseSeederPath);
        
        $seederEntries = [];
        $tables = DB::select('SHOW TABLES');
        
        foreach ($tables as $table) {
            $tableName = array_values((array) $table)[0];
            $className = Str::studly($tableName) . 'Seeder';
            $seederEntry = "        \$this->call({$className}::class);";
            
            // Check if the seeder entry already exists in the DatabaseSeeder file
            if (strpos($databaseSeederContent, $seederEntry) === false) {
                $seederEntries[] = $seederEntry;
            }
        }
        
        // Find the position to insert the new seeder entries
        $insertPosition = strpos($databaseSeederContent, '}');
        $insertPosition = strrpos(substr($databaseSeederContent, 0, $insertPosition), "\n") + 1;
        
        // Append the new seeder entries at the bottom of the class
        $seederEntriesIndented = implode("\n", $seederEntries);
        
        // Ensure that there's no empty line before appending
        if (!empty($seederEntriesIndented)) {
            $databaseSeederContent = substr_replace($databaseSeederContent, $seederEntriesIndented . "\n", $insertPosition, 0);
        }
        
        file_put_contents($databaseSeederPath, $databaseSeederContent);
    }
}
