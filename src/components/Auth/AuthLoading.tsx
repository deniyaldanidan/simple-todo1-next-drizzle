import styles from "@/styles/hourglass.module.css";

export default function AuthLoading() {
  return (
    <section className="px-2 min-h-screen h-fit flex flex-col gap-y-10 items-center justify-center">
      <div className={styles.hourglass}></div>
      <h2 className="text-xl font-semibold text-center">
        Loading, please wait a sec...
      </h2>
    </section>
  );
}
