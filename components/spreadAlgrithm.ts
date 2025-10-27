
import { Card, cardList } from "@/components/Data";


export function drawOne(): Card[] {
    return [cardList[Math.floor(Math.random() * cardList.length)]];
}
