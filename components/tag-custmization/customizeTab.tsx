import React from "react";
import { __removeTagByName } from '../../lib/firebase'

const CustomiseTab = ({ store }: any) => {
    console.log(store)
    return (
        <div style={{ height: "90% ", overflowY: 'auto', }} >
            {store.tags.map((tag: any, index: number) => <Tag key={index}>{{ ...tag, delete: () => __removeTagByName(tag.name) }}</Tag>)}
        </div>
    )
}

// component 
const Tag = ({ children }: any) => (
    <div className="flex justify-between items-center py-2">
        <h3 className="capitalize">{children.name}</h3>
        <button onClick={() => { children.delete() }} className="bg-red-100  text-red-500 px-3 text-sm rounded capitalize py-1">×</button>
    </div>
)



export default CustomiseTab