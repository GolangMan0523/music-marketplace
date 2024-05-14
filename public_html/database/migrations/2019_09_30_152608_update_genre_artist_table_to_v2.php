<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateGenreArtistTableToV2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('genre_artist', function (Blueprint $table) {
            if (Schema::hasColumn('genre_artist', 'created_at')) {
                $table->dropColumn('created_at');
            }
            if (Schema::hasColumn('genre_artist', 'updated_at')) {
                $table->dropColumn('updated_at');
            }

            $table->renameColumn('artist_id', 'genreable_id');
            if ( ! Schema::hasColumn('genre_artist', 'genreable_type')) {
                $table->string('genreable_type', 10)->index()->default('App\\\Artist');
            }

            $sm = Schema::getConnection()->getDoctrineSchemaManager();
            $indexesFound = $sm->listTableIndexes('genre_artist');

            if (array_key_exists('genre_artist_artist_id_genre_id_unique', $indexesFound)) {
                $table->dropIndex('genre_artist_artist_id_genre_id_unique');
            }

            $table->unique(['genreable_id', 'genreable_type', 'genre_id']);
        });

        Schema::table('genre_artist', function (Blueprint $table) {
            $table->rename('genreables');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
