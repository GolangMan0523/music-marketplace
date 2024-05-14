import {
  useInfiniteData,
  UseInfiniteDataProps,
} from '@common/ui/infinite-scroll/use-infinite-data';
import {useParams} from 'react-router-dom';

export function useInfiniteSearchResults<T>(
  modelType: string,
  initialPage: UseInfiniteDataProps<T>['initialPage'],
) {
  const {searchQuery} = useParams();
  return useInfiniteData<T>({
    endpoint: `search/model/${modelType}`,
    queryParams: {query: searchQuery || ''},
    initialPage,
    queryKey: ['search', modelType],
    paginate: 'simple',
  });
}
