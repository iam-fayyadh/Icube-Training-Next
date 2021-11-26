import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home(props) {
  console.log(props);
  return (
    <div className={styles.container}>
      <h1>Pilih Menuuuu</h1>
      <div className={styles.cardcategory}>
        {(props.categories &&
          props.categories.map((category) => {
            return (
              <div className={styles.cardcontent}>
                {/* <Link href={`/catde/${category.strCategory}`}> */}
                <img src={category.strCategoryThumb} />
                <Link href={`/${category.strCategory}`}>
                  {category.idCategory % 2 == 1 ? (
                    // ini kalau ganjil
                    <p
                      style={{ fontWeight: "bold", cursor: "pointer" }}
                      className="textganjil"
                      key={category.idCategory}
                    >
                      {category.strCategory}
                    </p>
                  ) : (
                    // ini kalau genap
                    <p
                      style={{ fontStyle: "italic", cursor: "pointer" }}
                      className="textgenap"
                      key={category.idCategory}
                    >
                      {category.strCategory}
                    </p>
                  )}
                </Link>
                <p>{category.strCategoryDescription}</p>
                <br />
              </div>
            );
          })) ||
          "Loading. . ."}
      </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const data = await res.json();
  // console.log(data);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      categories: data.categories,
    },
  };
}
