<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::table('artists', function (Blueprint $table) {
            $table->index('created_at');
            $table->index('image_small');
        });
    }


    public function down()
    {
        //
    }
};
