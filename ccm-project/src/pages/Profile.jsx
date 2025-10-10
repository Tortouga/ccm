import { useArgent, useSetArgent } from "@/context/argentContext";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Profil Utilisateur
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <p className="text-lg">
          <span className="font-semibold">ID du profil :</span> {id}
        </p>
        <p className="text-gray-600">
          Données fictives pour l'utilisateur #{id}
        </p>
        <p>
          {useArgent} : {useArgent()} €
        </p>
      </div>
    </div>
  );
}

export default Profile;
