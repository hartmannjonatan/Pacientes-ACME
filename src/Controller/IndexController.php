<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Paciente;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Config\Doctrine;

#[Route('/api', name: 'api_')] //esse controller é responsável por todas as rotas da api (começando com /api)
class IndexController extends AbstractController
{
    #[Route('/', name: 'list', methods: ['GET'])] //a rota padrão "/api/ via get retorna um array contendo todos os dados de todos os pacientes registrados
    public function index(ManagerRegistry $doctrine): JsonResponse
    {
        $pacientes = $doctrine->getRepository(Paciente::class)->findAll(); //utiliza-se o método padrão findAll do próprio repositório gerado pelo Symfony

        $data = [];

        foreach($pacientes as $paciente){ //armazena no array data os dados de cada paciente
            $data[] = [
                'id' => $paciente->getId(),
                'nome' => $paciente->getNome(),
                'dataNasc' => $paciente->getDataNascimento(),
                'cpf' => $paciente->getCPF(),
                'sexo' => $paciente->getSexo(),
                'endereco' => $paciente->getEndereco(),
                'status' => $paciente->isStatus()
            ];
        }

        return $this->json($data); //retorna o json com os dados
    }

    #[Route('/create', methods: ['POST'], name: 'create')] //a rota via post /create é responsável por persistir um novo paciente no BD
    public function create(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $paciente = new Paciente(); //instancia um novo paciente
        //seta os dados do objeto paciente de acordo com o enviado pela requisição
        $paciente->setNome($request->request->get('nome'));
        $paciente->setDataNascimento(date_create($request->request->get('dataNasc'))); //a data de nascimento é criada com o date_create() do php
        $paciente->setCPF($request->request->get('cpf'));
        $paciente->setSexo($request->request->get('sexo'));
        $paciente->setEndereco($request->request->get('endereco'));

        $entityManager->persist($paciente); //persiste no BD
        $entityManager->flush();

        return $this->json('Paciente cadastrado com sucesso. ID: '.$paciente->getId()); //retorna o sucesso com json
    }

        #[Route('/edit/{id}', methods: ['POST'], name: 'edit')] //rota via post /edit/{id} atualiza um registro de um paciente com base em seu ID
    public function edit(Request $request, ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $paciente = $entityManager->getRepository(Paciente::class)->find($id); //encontra o paciente usando o método padrão find

        if(!$paciente){ //se não há paciente cadastrado com aquele id é retornado erro 404
            return $this->json('Nenhum paciente com o ID '.$id.' foi encontrado.', 404);
        }
        
        //dados do paciente são atualizados de acordo com o que é recebido pela requisição
        $paciente->setNome($request->request->get('nome'));
        $paciente->setDataNascimento(date_create($request->request->get('dataNasc')));
        $paciente->setCPF($request->request->get('cpf'));
        $paciente->setSexo($request->request->get('sexo'));
        $paciente->setEndereco($request->request->get('endereco'));

        
        $entityManager->flush(); //atualização é enviada ao BD

        $data = [
            'id' => $paciente->getId(),
            'nome' => $paciente->getNome(),
            'dataNasc' => $paciente->getDataNascimento(),
            'cpf' => $paciente->getCPF(),
            'sexo' => $paciente->getSexo(),
            'endereco' => $paciente->getEndereco()
        ];

        return $this->json($data); //retorna o json do paciente atualizado
    }

    #[Route('/delete/{id}', methods: ['DELETE'], name: 'delete')] //rota via DELETE exclui um paciente com base em seu ID
    public function delete(Request $request, ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $paciente = $entityManager->getRepository(Paciente::class)->find($id); //encontra o paciente usando o método padrõa find e o id enviado

        if(!$paciente){ //se paciente com esse id não existe no BD, é retornado um erro 404
            return $this->json('Nenhum paciente com o ID '.$id.' foi encontrado.', 404);
        }

        $entityManager->remove($paciente); //paciente é removido do BD
        $entityManager->flush();

        return $this->json('Paciente com ID '.$id.' foi deletado com sucesso'); //retorna json com sucesso
    }

    #[Route('/validyCPF/{cpf}', methods: ['GET'], name: 'validyCPF')] //rota via get que valida um cpf
    public function validyCPF(Request $request, ManagerRegistry $doctrine, string $cpf): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $paciente = $entityManager->getRepository(Paciente::class)->findCPF($cpf); //usa o método findCPF (criado) para encontrar algum paciente com aquele cpf

        if(!$paciente){
            return $this->json(true); //se não houver um paciente cadastrado com aquele cpf, é retornado true
        } else{
            return $this->json(false); //se não, é retornado false
        }
    }

    #[Route('/show/{id}', methods: ['GET'], name: 'show')] //rota via get que retorna todos os dados de um único paciente com base em seu id
    public function show(Request $request, ManagerRegistry $doctrine, string $id): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $paciente = $entityManager->getRepository(Paciente::class)->find($id); //paciente é encontrado utilizando o método padrão find

        if(!$paciente){ //se o paciente não for encontrado, um erro 404 é retornado
            return $this->json("Nenhum paciente encontrado com este id", 404);
        } else{
            $data = [
                'id' => $paciente->getId(),
                'nome' => $paciente->getNome(),
                'dataNasc' => $paciente->getDataNascimento(),
                'cpf' => $paciente->getCPF(),
                'sexo' => $paciente->getSexo(),
                'endereco' => $paciente->getEndereco(),
                'status' => $paciente->isStatus()
            ];
            return $this->json($data); //retorna os dados do paciente em json
        }
    }

    #[Route('/changeStatus/{id}', methods: ['GET'], name: 'changeStatus')] //rota via get responsável por alterar o status de um paciente utilizando seu id
    public function changeStatus(Request $request, ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $paciente = $entityManager->getRepository(Paciente::class)->find($id); //paciente é encontrado

        if(!$paciente){
            return $this->json('Nenhum paciente com o ID '.$id.' foi encontrado.', 404); //retorna erro 404 se não encontrar paciente
        }
        
        $paciente->setStatus(!$paciente->isStatus());//o status do paciente é setado como o valor oposto ao antigo valor

        $entityManager->flush();

        $data = [
            'id' => $paciente->getId(),
            'nome' => $paciente->getNome(),
            'dataNasc' => $paciente->getDataNascimento(),
            'cpf' => $paciente->getCPF(),
            'sexo' => $paciente->getSexo(),
            'endereco' => $paciente->getEndereco()
        ];

        return $this->json($data); // é retornado os dados deste paciente
    }

    #[Route('/searchName/', methods: ['POST'], name: 'searchName')] //rota via post que procura um paciente pelo seu nome no banco de dados
    public function searchName(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $pacientes = $entityManager->getRepository(Paciente::class)->findByNome($request->request->get('input')); //utiliza o método findByNome (criado) utilizando como parâmetro o input recebido pela requisição

        if(!$pacientes){
            return $this->json(null); //se não houver pacientes é retornado null
        }

        return $this->json($pacientes); //se houver pacientes é retornado os seus dados em json
    }
}
