import {TbBuildingCastle, TbMasksTheater, TbToolsKitchen3 } from "react-icons/tb";
import{MdOutlineFamilyRestroom} from "react-icons/md";
import { FaChurch,FaWater, FaCarAlt,FaParachuteBox } from "react-icons/fa";
import { LuChurch,LuBaby,LuFerrisWheel } from "react-icons/lu";
import { RiCupLine } from "react-icons/ri";
import { PiForkKnifeBold,PiPaintBrushFill } from "react-icons/pi";
import{GiCastle, GiMusicalNotes,GiElephant,GiWaterfall,GiHighGrass} from "react-icons/gi";
import { IoFootsteps,IoRainyOutline } from "react-icons/io5";
import { FaBuildingColumns } from "react-icons/fa6";
import {BiWorld,} from "react-icons/bi";
import {MdOutlineKayaking,MdForest, MdPets,MdOutlineEmojiPeople } from "react-icons/md";
import { SlPicture } from "react-icons/sl";
import {AiOutlineSafety  } from "react-icons/ai";
import { BsCalendarDay } from "react-icons/bs";

export const categories = [
  {
    label: "Все",
    icon: <BiWorld />,
  },
  {
    img: "assets/historical.jpg",
    label: "Исторические",
    icon: <TbBuildingCastle />,
    description: "This property is close to the beach!",
  },
  {
    img: "assets/cultural.jpg",
    label: "Культурные",
    icon: <TbMasksTheater />,
    description: "This property is has windmills!",
  },
  {
    img: "assets/gastro.jpg",
    label: "Гастрономические",
    icon: <TbToolsKitchen3 />,
    description: "This property is in the countryside!",
  },
  {
    img: "assets/family.jpeg",
    label: "Семейные",
    icon: <MdOutlineFamilyRestroom />,
    description: "This is property has a beautiful pool!",
  },
]


export const facilities = [

  {
    name: "Замок",
    icon: <GiCastle />,
  },
  {
    name: "Музей",
    icon: <FaBuildingColumns/>,
  },
  {
    name: "Экскурсия",
    icon: <MdOutlineEmojiPeople />,
  },
  {
    name: "Концерт",
    icon: <GiMusicalNotes />,
  },
  {
    name: "Выставка",
    icon: <PiPaintBrushFill />,
  },
  {
    name: "Кафе",
    icon: <RiCupLine />,
  },
  {
    name: "Ресторан",
    icon: <PiForkKnifeBold />,
  },
  {
    name: "Церковь",
    icon: <FaChurch />
  },
  {
    name: "Костел",
    icon: <LuChurch />,
  },
  {
    name: "Галерея",
    icon: <SlPicture />,
  },
  {
    name: "Зоопарк",
    icon: <GiElephant />,
  },
  {
    name: "Парк аттракционов",
    icon: <LuFerrisWheel />,
  },
  {
    name: "Озеро",
    icon: <FaWater />,
  },
  {
    name: "Аквапарк",
    icon: <GiWaterfall />,
  },
  {
    name: "Летний",
    icon: <GiHighGrass />,
  },
  {
    name: "Всесезонный",
    icon: <IoRainyOutline />,
  },
  {
    name: "Однодневный",
    icon: <BsCalendarDay />,
  },
  {
    name: "Экстремальный",
    icon: <FaParachuteBox />,
  },
  {
    name: "Безопасный",
    icon: <AiOutlineSafety />,
  },
  {
    name: "Природа",
    icon: <MdForest />,
  },
  {
    name: "Байдарки",
    icon: <MdOutlineKayaking />,
  },
  {
    name: "Пешком",
    icon: <IoFootsteps />,
  },
  {
    name: "На машине",
    icon: <FaCarAlt />,
  },
  {
    name: "С детьми",
    icon: <LuBaby />
  },
  {
    name: " С животными",
    icon: <MdPets />
  }
];
