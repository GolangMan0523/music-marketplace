<?php

use App\Models\Genre;
use Illuminate\Database\Migrations\Migration;

class SlugifyGenreNameColumn extends Migration
{
    public function up()
    {
        foreach (Genre::cursor() as $genre) {
            $slugName = slugify($genre->name);

            if (!$genre->display_name) {
                $genre->display_name = $genre->name;
            }

            $genre->display_name = str_replace(
                ['-', '_'],
                ' ',
                $genre->display_name,
            );

            if ($slugName !== $genre->name) {
                $genre->name = $slugName;

                // find duplicate
                if ($duplicate = Genre::where('name', $slugName)->first()) {
                    // attach all relations from duplicate to genre
                    try {
                        DB::table('genreables')
                            ->where('genre_id', $duplicate->id)
                            ->update(['genre_id' => $genre->id]);
                    } catch (Exception $e) {
                        // ignore
                    }

                    // delete duplicate
                    $duplicate->delete();
                }
            }

            $genre->save();
        }
    }

    public function down()
    {
        //
    }
}
