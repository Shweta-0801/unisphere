import AppLayout from "../../components/layout/AppLayout";
import MyClasses from "../../components/teacher/MyClasses";

export default function MyClassesPage() {
  return (
    <AppLayout activePath="/teacher/classes">
      <MyClasses />
    </AppLayout>
  );
}
