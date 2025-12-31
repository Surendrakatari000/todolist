import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { updateSelectedCategory } from "../../store/slices/todo";

export default function CategoryCarousel() {
  const dispatch = useDispatch();
  const Todocategories = useSelector((state) => state.Todo.todoCategory);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 4,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    laptop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      partialVisibilityGutter: 25,
    },
    tablet: {
      breakpoint: { max: 768, min: 480 },
      items: 2,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 480, min: 0 },
      items: 2,
      partialVisibilityGutter: 15,
    },
  };
  console.log(Todocategories.selectedCategory);
  const theme = useSelector((state) => state.Todo.theme);

  return (
    <Carousel
      responsive={responsive}
      arrows={false} //
      draggable={true}
      infinite={false}
      partialVisible={true}
      showDots={false}
      itemClass="px-2"
      className="mb-[30px]"
    >
      {Todocategories.categories.map((cat) => (
        <button
          key={cat}
          onClick={() => dispatch(updateSelectedCategory(cat))}
          className={`
            w-full
            py-3
            border
            ${
              Todocategories.selectedCategory == cat
                ? "border-blue-400 text-blue-400 text-xl border-[2px]"
                : theme
                ? "text-black border-black text-lg"
                : "text-white text-lg"
            }
            }
            rounded-xl
            text-center
          `}
        >
          {cat}
        </button>
      ))}
    </Carousel>
  );
}
