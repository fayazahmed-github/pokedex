import { DataGrid } from '@monorepo/components';
import { useAppDispatch, useAppSelector } from '../store';
import { getPokemonList } from '../features/pokemon/pokemonSlice';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPage } from 'next';
import { wrapper } from '../store';
import { GRID_COLUMNS, PAGE_ROW_SIZE } from './constants'

const Home: NextPage = () => {
  const list = useAppSelector((state) => state.pokemon.list)
  const loading = useAppSelector((state) => state.pokemon.loading)
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(list.length / PAGE_ROW_SIZE);

  const handleRowClick = (id: string) => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <div style={{ height: '100vh', padding: '2rem' }}>
      <DataGrid
        rows={list.map((p) => ({ id: p.url.split('/')[6], ...p }))}
        columns={GRID_COLUMNS}
        loading={loading}
        onRowClick={handleRowClick}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        pageSize={PAGE_ROW_SIZE}
      />
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getPokemonList(1));
    return { props: {} };
  }
);

export default Home;