import { DataGrid } from '@monorepo/components';
import { useAppDispatch, useAppSelector } from '../store';
import { getPokemonList } from '../features/pokemon/pokemonSlice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { wrapper } from '../store';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'url', headerName: 'URL', width: 400 },
];
const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.pokemon.list)
  const loading  = useAppSelector((state) => state.pokemon.loading)
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  
  const totalPages = Math.ceil(list.length / pageSize);

  const handleRowClick = (id: string) => {
    router.push(`/pokemon/${id}`);
  };

  return (
          <div style={{ height: '100vh', padding: '2rem' }}>
      <DataGrid
        rows={list.map((p) => ({ id: p.url.split('/')[6], ...p }))}
        columns={columns}
        loading={loading}
        onRowClick={handleRowClick}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
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