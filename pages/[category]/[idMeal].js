import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";

export default function MealDetail(props) {
  const router = useRouter();
  const meal = props.meal.meals;
  const category = router.query.category;
  // console.log(meal);
  return (
    <div>
      <Head>
        <title>Search result for {meal[0].strMeal}</title>
      </Head>
      {(meal &&
        meal.map((detail) => {
          let url = new URL(`${detail.strYoutube}`);
          let code = url.search.replace("?v=", "");
          let embed = `https://www.youtube.com/embed/${code}`;
          return (
            <div className={styles.mealDetail} key={detail.idMeal}>
              <Link href={`/${router.query.category}/`}>
                <a>Back to {detail.strCategory}</a>
              </Link>
              <br />
              <Link href="/">
                <a>Back to Home</a>
              </Link>
              <h2>{detail.strMeal}</h2>
              <p>{detail.strInstructions}</p>
              <Image
                layout={"fixed"}
                width={560}
                height={315}
                src={detail.strMealThumb}
                alt={detail.strMeal}
              />
              <br />
              <iframe
                width="560"
                height="315"
                src={embed}
                title={detail.strMeal}
                frameBorder="1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          );
        })) ||
        "Not Found..."}
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${context.params.idMeal}`
  );
  const data = await res.json();
  // console.log(context.params.idMeal);
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      meal: data,
    },
  };
}
