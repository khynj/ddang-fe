import MaterialIcon from '@/components/icons/MaterialIcon'
import SearchHistory from '../components/SearchHistory'
import { useAuctionSearchHistory, useCategory } from '@/apis/auction'
import CategoryList from '../components/category/CategoryList'

function SearchPage() {
  const { data: searchHistory } = useAuctionSearchHistory()
  const { data: categories } = useCategory(0)

  // 중복 제거 및 최신 4개 검색어 추출
  const uniqueSearchHistory = searchHistory
    ?.filter(({ searchKey }) => searchKey)
    // 중복된 검색어 제거 (최신 항목 유지)
    .reduce((acc, current) => {
      const isDuplicate = acc.find(item => item.searchKey === current.searchKey)
      if (!isDuplicate) {
        acc.push(current)
      }
      return acc
    }, [])
    // 최신순 정렬
    .sort((a, b) => b.memberSearchHistoryId - a.memberSearchHistoryId)
    // 상위 4개만 표시
    .slice(0, 4)

  return (
    <div className='flex flex-col h-full overflow-y-scroll'>
      <div className='flex items-center gap-2 p-3 font-bold text-gray-700'>
        <MaterialIcon name='search_activity' size={24} />
        <p>최근 검색어</p>
      </div>
      {uniqueSearchHistory?.map(history => (
        <SearchHistory
          key={history.memberSearchHistoryId}
          id={history.memberSearchHistoryId}
          text={history.searchKey}
        />
      ))}
      <div className='flex flex-col mt-4 gap-2 px-2'>
        {categories?.map((category, index) => (
          <div key={index} className='flex flex-col gap-2 p-2 text-gray-950'>
            <p className='font-bold mb-1'>{category.name}</p>
            <div className='flex flex-wrap gap-4'>
              <CategoryList category={category} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
