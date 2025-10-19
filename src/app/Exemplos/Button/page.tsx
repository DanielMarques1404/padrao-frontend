import { Button } from "@/components/ui/Button";

const ButtonPage = () => {
  return (
    <main className="m-6 space-y-2">
      <div className="flex gap-2">
        <Button className="" variant="primary" size="sm">
          Salvar
        </Button>
        <Button variant="primary" size="md">
          Salvar
        </Button>
        <Button className="" variant="primary" size="lg">
          Salvar
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm">
          Salvar
        </Button>
        <Button className="" variant="secondary" size="md">
          Salvar
        </Button>
        <Button variant="secondary" size="lg">
          Salvar
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="danger" size="sm">
          Salvar
        </Button>
        <Button className="" variant="danger" size="md">
          Salvar
        </Button>
        <Button variant="danger" size="lg">
          Salvar
        </Button>
      </div>
    </main>
  );
};

export default ButtonPage;
