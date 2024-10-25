import { PageHeadline } from '@/app/components/PageHeadline';
import { SectionHeadline } from '@/app/components/SectionHeadline';
import { Category, Recipe } from '@/app/Recipe.type';
import {
  CategoriesWithCount,
  getAllRecipeCategories,
  getAllRecipes,
} from '@/lib/recipes';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { RecipeTileList } from '@/app/components/RecipeTileList';
import { SiteHeadTitle } from '@/components/SiteHeadTitle';
import Head from 'next/head';

type Props = {
  category: Category;
  recipes: Recipe[];
};

interface Params extends ParsedUrlQuery {
  category: string;
}

export const getStaticPaths = (async () => {
  const categories: CategoriesWithCount = getAllRecipeCategories();
  return {
    paths: Object.keys(categories).map((slug) => ({ params: { slug } })),
    fallback: true, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const { slug } = context.params as Params;
  const recipes = getAllRecipes().filter(({ category }) => category === slug);

  return { props: { category: slug as Category, recipes } };
}) satisfies GetStaticProps<Props>;

export default function Page({ category, recipes }: Props) {
  return (
    <>
      <Head>
        <SiteHeadTitle title={`Recipes from the category: ${category}`} />
      </Head>
      <main className="container mx-auto px-4">
        <PageHeadline text={`Category: ${category}`} />

        <SectionHeadline text="Recipes" />
        <RecipeTileList recipes={recipes} />
      </main>
    </>
  );
}
