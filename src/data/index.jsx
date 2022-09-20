import HotSpot1 from '../components/hotSpot/hotSpot1'
import HotSpot2 from '../components/hotSpot/hotSpot2'
import HotSpot3 from '../components/hotSpot/hotSpot3'
import HotSpot4 from '../components/hotSpot/hotSpot4'
import HotSpot5 from '../components/hotSpot/hotSpot5'
import HotSpot6 from '../components/hotSpot/hotSpot6'
import HotSpot7 from '../components/hotSpot/hotSpot7'
import Modal1 from '../components/modals'


export let eventSchedules = [
    {
        id: 1,
        timeToShow: 2,
        timeToHide: 5,
        modalComponent: <Modal1 />,
        HotSpotComponent: <HotSpot1 />
    },
    {
        id: 2,
        timeToShow: 6,
        timeToHide: 10,
        modalComponent: <Modal1 />,
        HotSpotComponent: <HotSpot2 />
    },
    {
        id: 3,
        timeToShow: 12,
        timeToHide: 15,
        modalComponent: <Modal1 />,
        HotSpotComponent: <HotSpot3 />
    },
    {
        id: 4,
        timeToShow: 18,
        timeToHide: 22,
        modalComponent: <Modal1 />,
        HotSpotComponent: <HotSpot4 />
    },
    {
        id: 5,
        timeToShow: 24,
        timeToHide: 27,
        modalComponent: <Modal1 />,
        HotSpotComponent: <HotSpot5 />
    },
    {
        id: 6,
        timeToShow: 28,
        timeToHide: 30,
        modalComponent: <Modal1 />,
        HotSpotComponent: <HotSpot6 />
    },
    {
        id: 7,
        timeToShow: 31,
        timeToHide: 33,
        modalComponent: <Modal1 />,
        HotSpotComponent: <HotSpot7 />
    },

]