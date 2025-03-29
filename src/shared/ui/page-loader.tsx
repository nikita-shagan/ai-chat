import { Overlay } from "@/shared/ui/overlay";
import { Preloader } from "@/shared/ui/preloader";

export function PageLoading() {
  return (
    <Overlay>
      <Preloader />
    </Overlay>
  );
}
