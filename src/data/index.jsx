import HotSpot1 from '../components/hotSpot/hotSpot1'
import HotSpot2 from '../components/hotSpot/hotSpot2'
import HotSpot3 from '../components/hotSpot/hotSpot3'
import HotSpot4 from '../components/hotSpot/hotSpot4'






import ModalBgTamim from "../assets/all-images/overlay-bg-Tamim.jpg";
import ModalBgBandarban from "../assets/all-images/overlay-bg-Bandarban.jpg";
import ModalBgCox from "../assets/all-images/overlay-bg-Cox_s-Bazar.jpg";
import ModalBgMoynamoti from "../assets/all-images/overlay-bg-moynamoti.jpg";



export let eventSchedules = [
    {
        id: 0,
        timeToShow: 1,
        timeToHide: 4,
        modalBackground: ModalBgCox,
        // modalComponent: <Modal1 />,
        hotSpotComponent: <HotSpot1 />
    },
    {
        id: 1,
        timeToShow: 8,
        timeToHide: 10,
        modalBackground: ModalBgMoynamoti,
        // modalComponent: <Modal2 />,
        hotSpotComponent: <HotSpot2 />
    },
    {
        id: 2,
        timeToShow: 11,
        timeToHide: 14,
        modalBackground: ModalBgBandarban,
        // modalComponent: <Modal3 />,
        hotSpotComponent: <HotSpot3 />
    },
    {
        id: 3,
        timeToShow: 15,
        timeToHide: 19,
        modalBackground: ModalBgTamim,
        // modalComponent: <Modal4 />,
        hotSpotComponent: <HotSpot4 />
    }

]