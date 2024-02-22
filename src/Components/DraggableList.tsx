import { useRef } from 'react'
import { useSprings, animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import clamp from 'lodash.clamp'
import swap from 'lodash-move'
import styled from 'styled-components'
import styles from './styles.module.css'
import { fn } from '../utils'

const MainContainer = styled.main`
  height: 500px;
  width: 300px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ItemsList = styled.div`
  margin-top: 10px;
  position: relative;
  width: 200px;
  height: 100px;

  & > div {
    position: absolute;
    width: 200px;
    transform-origin: 50% 50% 0px;
    border-radius: 5px;
    color: white;
    text-align: center;
    line-height: 40px;
    font-size: 14.5px;
    background: lightblue;
    text-transform: uppercase;
    letter-spacing: 2px;
    touch-action: none;
    user-select: none;

    &:hover{
      cursor: pointer;
    }
  }
`

export function DraggableList ({ items, setApprovedNames }: { items: string[], setApprovedNames: (names: string[]) => void }) {
  const order = useRef(items.map((_, index) => index))
  const [springs, api] = useSprings(items.length, fn(order.current))
  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1)
    const newOrder = swap(order.current, curIndex, curRow) as number[]
    api.start(fn(newOrder, active, originalIndex, curIndex, y))

    if (active) return

    order.current = newOrder
    const lastOrderString = localStorage.getItem('approvedNames')

    if (lastOrderString === null) return

    const lastOrder = JSON.parse(lastOrderString) as string[]
    const newNamesOrder = []

    for (let index = 0; index < order.current.length; index++) {
      const element = order.current[index]
      newNamesOrder.push(lastOrder[element])
    }

    localStorage.setItem('approvedNames', JSON.stringify(newNamesOrder))
    setApprovedNames(newNamesOrder)
  })

  return (
    <MainContainer>
      <ItemsList className={styles.content} style={{ height: items.length * 50 }}>
        {springs.map(({ zIndex, shadow, y, scale }, i) => (
          <animated.div
            {...bind(i)}
            key={i}
            style={{
              zIndex,
              boxShadow: shadow.to(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
              y,
              scale
            }}
          >
            {items[i]}
          </animated.div>
        ))}
      </ItemsList>
    </MainContainer>
  )
}