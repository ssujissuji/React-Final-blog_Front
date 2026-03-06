export default function PostCardLoading() {
  return (
    <>
      <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 animate-pulse">
        <div className="block relative aspect-video overflow-hidden w-full"></div>
        <div className="absolute top-0 left-0 rounded-full w-10 h-10 mt-2 ml-2"></div>
        <div className="p-4 space-y-2 ">
          <div className="h-5.5 bg-gray-300 rounded"></div>
          <div className="h-5.5 bg-gray-300 rounded"></div>
          <div className="flex w-full space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-25"></div>
            </div>
            <div className="flex items-center space-x-2 grow-1">
              <div className="h-4 w-4 rounded-full bg-gray-300"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
