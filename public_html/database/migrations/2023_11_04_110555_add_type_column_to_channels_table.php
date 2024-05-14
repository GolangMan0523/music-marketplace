<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('channels', function (Blueprint $table) {
            if (!Schema::hasColumn('channels', 'internal')) {
                $table
                    ->boolean('internal')
                    ->default(false)
                    ->index()
                    ->after('name');
            }
            if (!Schema::hasColumn('channels', 'description')) {
                $table
                    ->text('description')
                    ->nullable()
                    ->after('internal');
            }
            if (!Schema::hasColumn('channels', 'type')) {
                $table
                    ->string('type', 10)
                    ->default('channel')
                    ->index()
                    ->after('description');
            }
        });
    }

    public function down()
    {
        //
    }
};
