import { SeachResult } from "../search-result"


export const SearchResultList = ({ results, setResults }:{ results:any, setResults:any }) => {
  return (
    <div>
      {results.map((result:any) => {
        return (
          <div key={result.id} className="mb-1 truncate max-h-24 mt-1">
            <SeachResult result={result} setResults={setResults}/>
          </div>
        )
      })}
    </div>
  )
}
