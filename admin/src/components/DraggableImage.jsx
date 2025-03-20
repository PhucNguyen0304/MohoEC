import React from 'react'
import {useDrag,useDrop} from 'react-dnd'
const ItemType = "IMAGE"
const DraggableImage = ({id,src,index,moveImage}) => {
    const [, ref] = useDrag({
        type:ItemType,
        item: { id,index}
    })
    const [,drop] = useDrop({
        accept:ItemType,
        hover: (draggedItem) => {
            if(draggedItem.index !== index) {
                moveImage(draggedItem.index,index)
                draggedItem.index =index
            }
        }
    })
    return (
        <div ref={(node)=>ref(drop(node))} className = 'w-[80px] h-[80px]'>
            <img src={src} alt="" className='w-full'/>
        </div>
    )
}
export default DraggableImage