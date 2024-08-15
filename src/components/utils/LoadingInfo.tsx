import styles from "@/styles/arcloader.module.css";

export default function LoadingInfo() {
  return (
    <section className="w-full min-h-screen h-fit flex flex-col gap-y-6 items-center justify-center">
      <div className={styles.arc}></div>
      <h2 className="text-xl font-semibold">Loading, please wait a sec...</h2>
    </section>
  );
}
