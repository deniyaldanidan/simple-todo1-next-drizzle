import AuthedInfo from "@/components/Auth/AuthedInfo";
import AuthLoading from "@/components/Auth/AuthLoading";
// import NotAuthedWarn from "@/components/Auth/NotAuthedWarn";

export default function SamplePage() {
  //   return <NotAuthedWarn />;
  return <AuthedInfo />;
}
