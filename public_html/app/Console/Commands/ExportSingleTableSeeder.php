<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ExportSingleTableSeeder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:export-single-table-seeder {table : The name of the table to export seeder for}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Export a seeder for a single table';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $table = $this->argument('table');
        $this->exportSingleTableSeeder($table);
        $this->updateDatabaseSeeder($table);
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

    protected function updateDatabaseSeeder($table)
    {
        $className = Str::studly($table) . 'Seeder';
        $seederEntry = "        \$this->call({$className}::class);";
    
        $databaseSeederPath = database_path('seeders/DatabaseSeeder.php');
        $databaseSeederContent = file_get_contents($databaseSeederPath);
    
        // Find the position to insert the new seeder entry
        $insertPosition = strpos($databaseSeederContent, '}');
        $insertPosition = strrpos(substr($databaseSeederContent, 0, $insertPosition), "\n") + 1;
    
        // Check if the seeder entry already exists in the DatabaseSeeder file
        if (strpos($databaseSeederContent, $seederEntry) === false) {
            // Insert the new seeder entry with proper indentation
            $indentation = substr($databaseSeederContent, $insertPosition, strpos($databaseSeederContent, "\n", $insertPosition + 1) - $insertPosition);
            $seederEntryIndented = str_replace("\n", "\n" . $indentation, $seederEntry);
            $databaseSeederContent = substr_replace($databaseSeederContent, $seederEntryIndented . "\n", $insertPosition, 0);
            file_put_contents($databaseSeederPath, $databaseSeederContent);
        }
    }
}