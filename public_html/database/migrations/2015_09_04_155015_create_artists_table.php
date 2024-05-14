<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateArtistsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('artists', function(Blueprint $table)  {
			$table->increments('id');
			$table->string('name');
			$table->integer('spotify_followers')->nullable()->unsigned();
			$table->tinyInteger('spotify_popularity')->nullable()->unsigned()->index();
			$table->string('image_small')->nullable();
			$table->boolean('fully_scraped')->default(0);
			$table->timestamp('updated_at')->nullable();

            $table->collation = config('database.connections.mysql.collation');
            $table->charset = config('database.connections.mysql.charset');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('artists');
	}

}
