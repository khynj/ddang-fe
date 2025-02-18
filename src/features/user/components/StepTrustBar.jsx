import PropTypes from 'prop-types'

function StepTrustBar({ score, setScore }) {
  // 단계 클릭 핸들러
  const onStepClick = index => {
    setScore(index)
  }

  return (
    <div className='relative w-full flex flex-col items-center mt-3'>
      <div className='absolute w-full bg-gray-200 h-3 rounded-full flex justify-center'>
        <div className='absolute flex justify-between items-center h-3 rounded-full z-3 w-[104%]'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              onClick={() => onStepClick(index)} // 클릭 이벤트
              className={`size-8 flex items-center justify-center z-3`}
              style={{
                left: `${(index / (5 - 1)) * 100}%`,
              }}
            >
              <div className='bg-white size-4 rounded-full shadow-md'></div>
            </div>
          ))}
        </div>
      </div>

      <div
        className='absolute top-0 left-0 h-3 bg-ddblue-400 rounded-full z-2'
        style={{
          width: `${(score / (5 - 1)) * 100}%`,
        }}
      ></div>
    </div>
  )
}

StepTrustBar.propTypes = {
  setScore: PropTypes.func.isRequired,
}

export default StepTrustBar
