import {selector} from 'recoil';
import { countAtom } from './atoms';

export const doubleCountSelector = selector({
    key: 'doubleCountSelector',
    get : ({get}) => {
        const count = get(countAtom);
        return count*2;
    }
})