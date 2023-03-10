<?php

//repositório do paciente gerado pelo doctrine

namespace App\Repository;

use App\Entity\Paciente;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Paciente>
 *
 * @method Paciente|null find($id, $lockMode = null, $lockVersion = null)
 * @method Paciente|null findOneBy(array $criteria, array $orderBy = null)
 * @method Paciente[]    findAll()
 * @method Paciente[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PacienteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Paciente::class);
    }

    public function save(Paciente $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Paciente $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return Paciente[] Returns an array of Paciente objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

   public function findCPF($cpf): ?Paciente //método criado para encontrar paciente pelo seu cpf
   {
       return $this->createQueryBuilder('p')
           ->andWhere('p.CPF = :val')
           ->setParameter('val', $cpf)
           ->getQuery()
           ->getOneOrNullResult()
       ;
   }

   public function findByNome($input): array //método criado para encontrar paciente pelo seu nome
   {
       $conn = $this->getEntityManager()->getConnection();

       $input = '%'.$input.'%'; //é encontrado qualquer cliente que possua em seu nome o valor input (seja no começo, meio ou fim)

       $sql = "SELECT * FROM paciente p WHERE p.nome LIKE :input"; //query manual

       $stmt = $conn->prepare($sql);
       $resultSet = $stmt->executeQuery(['input' => $input]);

       $array = array($resultSet->fetchAllAssociative());
       return $array;
   }
}
