<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChannelablesTable extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('channelables', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('channel_id')->unsgined()->index();
            $table->string('channelable_type', 20)->index();
            $table->integer('channelable_id')->unsgined()->index();
            $table->integer('order')->unsgined()->default(0)->index();

            $table->unique(['channelable_type', 'channelable_id', 'channel_id'], 'channelables_unique');
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('channelables');
    }
}
