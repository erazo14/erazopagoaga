import React, { useEffect } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
// import {
//   NextButton,
//   PrevButton,
//   usePrevNextButtons
// } from './EmblaCarouselArrowButtons'
// import { DotButton, useDotButton } from './EmblaCarouselDotButton'

type PropType = {
  slides?: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel = (props: PropType) => {
  const { options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, loop: true })

  useEffect(() => {
    if (!emblaApi) return

    const intervalId = window.setInterval(() => {
      emblaApi.scrollNext()
    }, 3000)

    return () => window.clearInterval(intervalId)
  }, [emblaApi])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          
          <div className="embla__slide" key="_R5_1939">
            <div className="embla__slide__number">
              <img draggable="false" loading="eager" width="1200" height="900" decoding="async" src="_R5_1939.jpg" />
            </div>
          </div>
          <div className="embla__slide" key="_R5_2152">
            <div className="embla__slide__number">
              <img draggable="false" loading="eager" width="1200" height="900" decoding="async" src="_R5_2152.jpg" />
            </div>
          </div>
          {/* <div className="embla__slide" key="_R5_1802">
            <div className="embla__slide__number">
              <img src="_R5_1802.jpg" />
            </div>
          </div> */}
          <div className="embla__slide" key="_R5_2104">
            <div className="embla__slide__number">
              <img draggable="false" loading="eager" width="1200" height="900" decoding="async" src="_R5_2104.jpg" />
            </div>
          </div>
          <div className="embla__slide" key="_R5_2027">
            <div className="embla__slide__number">
              <img draggable="false" loading="eager" width="1200" height="900" decoding="async" src="_R5_2027.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
