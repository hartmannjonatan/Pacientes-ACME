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

class IndexController extends AbstractController
{
    #[Route('/', name: 'app_index')]
    public function index(ManagerRegistry $doctrine): JsonResponse
    {
        $pacientes = $doctrine->getRepository(Paciente::class)->findAll();

        $data = [];

        foreach($pacientes as $paciente){
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

        return $this->json($data);
    }

    #[Route('/create', methods: ['POST'], name: 'create')]
    public function create(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $paciente = new Paciente();
        $paciente->setNome($request->request->get('nome'));
        $paciente->setDataNascimento(date_create($request->request->get('dataNasc')));
        $paciente->setCPF($request->request->get('cpf'));
        $paciente->setSexo($request->request->get('sexo'));
        $paciente->setEndereco($request->request->get('endereco'));

        $entityManager->persist($paciente);
        $entityManager->flush();

        return $this->json('Paciente cadastrado com sucesso. ID: '.$paciente->getId());
    }

    #[Route('/edit/{id}', methods: ['POST'], name: 'edit')]
    public function edit(Request $request, ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $paciente = $entityManager->getRepository(Paciente::class)->find($id);

        if(!$paciente){
            return $this->json('Nenhum paciente com o ID '.$id.' foi encontrado.', 404);
        }
        
        $paciente->setNome($request->request->get('nome'));
        $paciente->setDataNascimento(date_create($request->request->get('dataNasc')));
        $paciente->setCPF($request->request->get('cpf'));
        $paciente->setSexo($request->request->get('sexo'));
        $paciente->setEndereco($request->request->get('endereco'));
        $paciente->setStatus($request->request->get('status'));

        
        $entityManager->flush();

        $data = [
            'id' => $paciente->getId(),
            'nome' => $paciente->getNome(),
            'dataNasc' => $paciente->getDataNascimento(),
            'cpf' => $paciente->getCPF(),
            'sexo' => $paciente->getSexo(),
            'endereco' => $paciente->getEndereco(),
            'status' => $paciente->isStatus()
        ];

        return $this->json($data);
    }

    #[Route('/delete/{id}', methods: ['DELETE'], name: 'delete')]
    public function delete(Request $request, ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $paciente = $entityManager->getRepository(Paciente::class)->find($id);

        if(!$paciente){
            return $this->json('Nenhum paciente com o ID '.$id.' foi encontrado.', 404);
        }

        $entityManager->remove($paciente);
        $entityManager->flush();

        return $this->json('Paciente com ID '.$id.' foi deletado com sucesso');
    }

    #[Route('/validyCPF/{cpf}', methods: ['GET'], name: 'validyCPF')]
    public function validyCPF(Request $request, ManagerRegistry $doctrine, string $cpf): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $paciente = $entityManager->getRepository(Paciente::class)->findCPF($cpf);

        if(!$paciente){
            return $this->json(true);
        } else{
            return $this->json(false);
        }
    }
}
