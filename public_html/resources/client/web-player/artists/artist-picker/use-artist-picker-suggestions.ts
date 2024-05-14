import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {NormalizedModel} from '@common/datatable/filters/normalized-model';
import {apiClient} from '@common/http/query-client';

interface Response extends BackendResponse {
  results: NormalizedModel[];
}

interface Params {
  query?: string;
  perPage?: number;
}

export function useArtistPickerSuggestions(queryParams: Params) {
  return useQuery({
    queryKey: ['artists', 'search-suggestions', queryParams],
    queryFn: () => fetchArtists(queryParams),
    placeholderData: keepPreviousData,
  });
}

async function fetchArtists(params: Params) {
  return apiClient
    .get<Response>('search/suggestions/artist', {params})
    .then(r => r.data);
}
