<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('tracks', function (Blueprint $table) {
            $table->renameColumn('url', 'src');
        });
    }

    public function down()
    {
        Schema::table('tracks', function (Blueprint $table) {
            $table->renameColumn('src', 'url');
        });
    }
};
