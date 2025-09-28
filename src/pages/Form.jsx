//react
import { useState } from "react";
//hooks
import { useLocations } from "../hooks/useLocations";
//components
import Input from "../components/Input";
import Select from "../components/Select";
import Modal from "../components/Modal";
//utils
import { validateForm } from "../utils/validations";

export default function Form() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
        pais: "",
        estado: "",
        ciudad: "",
    });

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const {
        countries,
        states,
        cities,
        loadingCountries,
        loadingStates,
        loadingCities,
        errorCountries,
        errorStates,
        errorCities
    } = useLocations(formData.pais, formData.estado);


    const handleChange = (e) => {
        const { name, value } = e.target;

        const newFormData = {
            ...formData,
            [name]: value,
            ...(name === "pais" ? { estado: "", ciudad: "" } : {}),
            ...(name === "estado" ? { ciudad: "" } : {}),
        };

        setFormData(newFormData);

        // Validar el campo en tiempo real
        const fieldErrors = validateForm(newFormData, name);
        setErrors((prev) => ({
            ...prev,
            [name]: fieldErrors[name] || "",
            ...(name === "pais" ? { estado: "", ciudad: "" } : {}),
            ...(name === "estado" ? { ciudad: "" } : {}),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateForm(formData);
        setErrors(newErrors);

        // Verificar si hay errores
        const hasErrors = Object.values(newErrors).some(error => error !== "");

        if (hasErrors) {
            return;
        }

        setShowModal(true);
    };

    const confirmSubmit = () => {
        setShowModal(false);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Formulario de Registro</h2>
                    <p className="text-gray-600">Complete todos los campos para continuar</p>
                </div>
                {submitted ? (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Registro Exitoso!</h3>
                        <p className="text-gray-600">Tus datos han sido enviados correctamente.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Nombre completo *"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                error={errors.nombre}
                                placeholder="Ingresa tu nombre completo"
                            />
                            <Input
                                label="Correo electrónico *"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                placeholder="ejemplo@correo.com"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Teléfono *"
                                name="telefono"
                                type="tel"
                                value={formData.telefono}
                                onChange={handleChange}
                                error={errors.telefono}
                                placeholder="+34 123 456 789"
                            />
                            <Input
                                label="Dirección"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                placeholder="Calle, número, ciudad"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-700">Ubicación</h3>
                            </div>
                            <div className="border-b pb-2"></div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Select
                                    label="País *"
                                    name="pais"
                                    value={formData.pais}
                                    onChange={handleChange}
                                    options={countries.map(country => ({
                                        id: country.iso2,
                                        name: country.name
                                    }))}
                                    error={errors.pais}
                                    loading={loadingCountries}
                                    errorMessage={errorCountries}
                                    required
                                />
                                <Select
                                    label="Estado/Provincia *"
                                    name="estado"
                                    value={formData.estado}
                                    onChange={handleChange}
                                    options={states.map(state => ({
                                        id: state.iso2,
                                        name: state.name
                                    }))}
                                    disabled={!formData.pais}
                                    error={errors.estado}
                                    loading={loadingStates}
                                    errorMessage={errorStates}
                                    required
                                />
                                <Select
                                    label="Ciudad *"
                                    name="ciudad"
                                    value={formData.ciudad}
                                    onChange={handleChange}
                                    options={cities.map(city => ({
                                        id: city.id.toString(),
                                        name: city.name
                                    }))}
                                    disabled={!formData.estado}
                                    error={errors.ciudad}
                                    loading={loadingCities}
                                    errorMessage={errorCities}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t">
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({
                                        nombre: "",
                                        email: "",
                                        telefono: "",
                                        direccion: "",
                                        pais: "",
                                        estado: "",
                                        ciudad: "",
                                    });
                                    setErrors({});
                                }}
                                className="cursor-pointer px-8 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className=" cursor-pointer px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                            >
                                Registrarse
                            </button>
                        </div>
                    </form>
                )}

                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Confirmar Registro</h3>
                            <p className="text-gray-600">Revisa tus datos antes de confirmar</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Nombre:</span>
                                    <p className="font-semibold text-gray-800">{formData.nombre}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Email:</span>
                                    <p className="font-semibold text-gray-800">{formData.email}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Teléfono:</span>
                                    <p className="font-semibold text-gray-800">{formData.telefono}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Dirección:</span>
                                    <p className="font-semibold text-gray-800">{formData.direccion || 'No especificada'}</p>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <span className="text-sm font-medium text-gray-500">País:</span>
                                    <p className="font-semibold text-gray-800">
                                        {countries.find((c) => c.iso2 === formData.pais)?.name || formData.pais}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Estado:</span>
                                    <p className="font-semibold text-gray-800">
                                        {states.find((s) => s.iso2 === formData.estado)?.name || formData.estado}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Ciudad:</span>
                                    <p className="font-semibold text-gray-800">
                                        {cities.find((c) => c.id.toString() === formData.ciudad)?.name || formData.ciudad}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                            >
                                Volver a Editar
                            </button>
                            <button
                                onClick={confirmSubmit}
                                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                            >
                                Confirmar Registro
                            </button>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
}
