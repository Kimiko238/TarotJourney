
import { Card, cardList } from "@/components/Data";


export function drawOne(): Card[] {
    const baseCard = cardList[Math.floor(Math.random() * cardList.length)];
    const isReversed = Math.random() < 0.5;
    return [{ ...baseCard, isReversed }];
}
