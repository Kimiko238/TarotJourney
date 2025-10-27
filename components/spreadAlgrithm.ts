
import {cardList} from "@/components/Data"


export function drawOne() {
    return [cardList[Math.floor(Math.random() * cardList.length)]];
}

