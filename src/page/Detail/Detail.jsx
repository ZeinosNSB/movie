function Detail() {
  return (
    <div className='relative w-32 aspect-square'>
      <svg className='w-full h-full' viewBox='0 0 100 100'>
        <circle className='text-gray-200 stroke-current' strokeWidth='10' cx='50' cy='50' r='40' fill='transparent' />
        <circle
          className='text-primary stroke-current'
          strokeWidth='10'
          strokeLinecap='round'
          cx='50'
          cy='50'
          r='40'
          fill='transparent'
          strokeDasharray='251.2'
          strokeDashoffset='calc(251.2 - (251.2 * 78) / 100)'
          style={{
            transition: 'stroke-dashoffset 0.5s',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%'
          }}
        />

        <text
          className='text-slate-600 font-bold text-xl'
          x='50'
          y='50'
          fontSize='12'
          textAnchor='middle'
          alignmentBaseline='middle'
        >
          7.8
        </text>
      </svg>
    </div>
  )
}

export default Detail
