import { InferGetStaticPropsType } from 'next';
import { ReactElement } from 'react';

export async function getStaticProps() {
  return {
    props: {},
  };
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

function Homepage(): JSX.Element {
  return (
    <div className="container">
      <button className="btn">open modal</button>
      <dialog id="my_modal_1" className="modal" open>
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

Homepage.getLayout = function getLayout(page: ReactElement, props: PageProps) {
  return <div className="flex flex-row p-2 bg-gray-700 h-screen w-full overflow-hidden">{page}</div>;
};

export default Homepage;
