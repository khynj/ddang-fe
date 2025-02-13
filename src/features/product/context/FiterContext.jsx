import { createContext, useContext } from 'react'

export const FilterContext = createContext({
  searchParams: null,
  setSearchParams: () => {},
  searchOptions: {},
})

export const useFilter = () => useContext(FilterContext)
