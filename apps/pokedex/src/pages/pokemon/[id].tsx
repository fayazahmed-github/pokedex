import { useAppDispatch, useAppSelector } from '../../store';
import { getPokemonDetails } from '../../features/pokemon/pokemonSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextPage } from 'next';
import { wrapper } from '../../store'

const PokemonDetails: NextPage = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((state) => state.pokemon);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(getPokemonDetails(id as string));
    }
  }, [dispatch, id]);

  if (!selected) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{selected.name}</h1>
      <img src={selected.sprites.front_default} alt={selected.name} />
      <h2>Abilities</h2>
      <ul>
        {selected.abilities.map((a: any) => (
          <li key={a.ability.name}>{a.ability.name}</li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id } = context.params!;
    await store.dispatch(getPokemonDetails(id as string));
    return { props: {} };
  }
);

export default PokemonDetails;