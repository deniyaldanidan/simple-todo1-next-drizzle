import styles from "@/styles/arcloader.module.css";

export default function LoadingInfo() {
  return (
    <section className="px-2 w-full min-h-screen h-fit flex flex-col gap-y-7 items-center justify-center">
      <div className={styles.arc}></div>
      <h2 className="text-xl font-semibold text-center">
        Loading, please wait a sec...
      </h2>
    </section>
  );
}
