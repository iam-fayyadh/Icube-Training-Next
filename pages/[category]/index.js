import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

export default function CategoryDetails(props) {
  const router = useRouter();
  //   console.log(router);
  return (
    <>
      <div>
        <h2 className="title">Search result for "{router.query.category}"</h2>
        <p>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </p>
        <div className={styles.cardcategory}>
          {props.categories &&
            props.categories.meals.map((meal) => {
              return (
                <>
                  <div className={styles.cardcontent}>
                    <Link href={`/${router.query.category}/${meal.idMeal}`}>
                      <h3 style={{ cursor: "pointer" }} key={meal.idMeal}>
                        {meal.strMeal}
                      </h3>
                    </Link>

                    <img width={300} src={meal.strMealThumb} />
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${context.params.category}`
  );
  const data = await res.json();
  //   console.log(data);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      categories: data,
    },
  };
}
