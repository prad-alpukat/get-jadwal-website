import Head from "next/head";
import NavbarLogged from "../../layout/navbar-logged";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Details({ query }) {
  const router = useRouter();
  const { day } = router.query;
  const [data, setData] = useState(null);

  const getDetailSchedule = async () => {
    const email = localStorage.getItem("email");
    const day = window.location.href.split("/").pop();

    const options = { method: "GET" };
    await fetch(
      `https://getjadwal.api.devcode.gethired.id/schedule?email=${email}&day=${day}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getDetailSchedule();
  }, []);
  return (
    <div>
      <Head>
        <title>Jadwal {day}</title>
      </Head>
      <NavbarLogged />
      <main className="container d-flex flex-column pb-5">
        <div className="d-flex justify-content-between mb-4">
          <div className="d-flex align-items-center gap-3">
            <a href="#" onClick={() => router.push("/home")} data-cy="btn-back">
              <img src="/img/back.svg" alt="back button" />
            </a>
            <h3 className="fw-bold fs-1 mb-0" data-cy="detail-title">
              {day == "monday"
                ? "Senin"
                : day == "tuesday"
                ? "Selasa"
                : day == "wednesday"
                ? "Rabu"
                : day == "thursday"
                ? "Kamis"
                : day == "friday"
                ? "Jumat"
                : false}
            </h3>
          </div>
          <button
            className="btn btn-primary rounded-pill fs-5 fw-bold  px-4 d-flex align-items-center gap-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-cy="btn-create-schedule"
          >
            <img src="/img/plus.svg" />
            <span>Tambah Mata Kuliah</span>
          </button>
        </div>
        <hr />
        {data != null ? (
          <div className="card-items py-4">
            {data.map((item, index) => {
              return (
                <div
                  className="card card-item flex-row rounded-12 d-flex justify-content-between align-items-center py-4 px-5 mb-3"
                  key={index}
                  data-cy="card-item-title"
                >
                  <p className="fs-5 mb-0">{item.title}</p>
                  <div className="d-flex gap-4 align-items-center">
                    <a href="javascript:void(0)">
                      <img src="/img/card-item-edit.svg" alt="edit" data-cy="card-item-edit" />
                    </a>
                    <a href="javascript:void(0)">
                      <img
                        src="/img/card-item-delete.svg"
                        alt="delete"
                        data-cy="card-item-delete"
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <img
            className="img-illus-empty align-self-center"
            src="/img/illus.svg"
            alt="empty illustration"
            data-cy="todo-empty-state"
          />
        )}
      </main>
    </div>
  );
}
